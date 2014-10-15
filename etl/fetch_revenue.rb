require "csv"
require "open-uri"
require_relative "etl_helper"

class FetchRevenue
  URL14 = "http://data.opencolorado.org/en/storage/f/2014-09-18T152927/marijuana_sales_tax_2014.csv"
  URL = "http://data.opencolorado.org/en/storage/f/2014-07-02T215102/medical_marijuana_sales_tax_2010_2013.csv"
  FOLDER = "data/"
  MEDICAL_HEADER = "Medical"
  RECREATIONAL_HEADER = "Recreational"
  RECREATIONAL_SPECIAL_HEADER = "Recreational Special Tax"
  QUARTERLY_PATH = FOLDER + "revenue-quarterly-line-graph.csv"
  MONTHLY_PATH = FOLDER + "revenue-monthly-horizontal-stacked-bar-graph.csv"

  def self.execute
    begin
      previous = fetch_csv_previous
      now = fetch_csv_2014

      create_quarterly_csv(previous + now)
      create_monthly_csv(now)
      ETLHelper.set_last_updated("revenue")
    rescue
      puts "Error fetching revenue data: #{$!}"
    end
  end

  private
  def self.strip_formatting(rev)
    rev.gsub(/(\.\d{2})/, '').gsub(/[^\d]/, '').to_i
  end

  def self.fetch_csv_2014
    now = Array.new
    headers = ["Month", "Retail (sales + special tax)", "Retail (3.5%)", "Medical"]
    csv = CSV.new(open(URL14)).drop(2)
    csv.each do |line|
      quarter = ETLHelper.get_quarter(Date::MONTHNAMES.index(line[0].strip))
      now << {:month => line[0].strip, :retail => strip_formatting(line[1].strip), 
        :retail_special => strip_formatting(line[2].strip), :medical => strip_formatting(line[3].strip), 
        :quarter => quarter, :year => 2014}
    end
    now
  end

  def self.fetch_csv_previous
    previous = Array.new
    csv = CSV.new(open(URL)).drop(2) # Drop the title and header lines
    csv.each do |line|
      if line[0] == "Quarterly Total" 
        next 
      end
      dt = Date.strptime(line[0].strip, '%d-%b-%y')
      quarter = ETLHelper.get_quarter(dt.month)
      previous << {:month => dt.strftime('%B'), :retail => 0, 
        :retail_special => 0, :medical => strip_formatting(line[1].strip), 
        :quarter => quarter, :year => dt.year}
    end
    previous
  end

  def self.current_quarter(year, quarter)
    today = Date.today
    this_year = today.year
    this_quarter = ETLHelper.get_quarter(today.month)
    return (year == this_year && quarter == this_quarter)
  end

  def self.current_month(year, month)
    today = Date.today
    this_year = today.year
    this_month = Date::MONTHNAMES.index(today.month)
    return (year == this_year && month == this_month)
  end

  def self.create_quarterly_csv(revenue)
    headers = ["quarter", "q", "year", "type", "revenue"]
   
    data = QuarterlyRevenue.new(revenue).rollup

    CSV.open(QUARTERLY_PATH, "wb") do |csv|
      csv << headers
      data.each do |rev|
        if current_quarter(rev[:year], rev[:quarter]) # If the quarter hasn't closed, the data is incomplete
          next
        end
        quarter = "Q" + rev[:quarter].to_s
        quarter_and_year = quarter + ' ' + rev[:year].to_s
        shared = [quarter_and_year, quarter, rev[:year]]
        medical = shared.dup << MEDICAL_HEADER << rev[:medical]
        recreational = shared.dup << RECREATIONAL_HEADER << rev[:retail]
        csv << recreational
        csv << medical
      end
    end
  end

  def self.create_monthly_csv(revenue)
    headers = ["month", "year", "type", "revenue"]

    CSV.open(MONTHLY_PATH, "wb") do |csv|
      csv << headers
      revenue.each do |rev|
        if current_month(rev[:month], rev[:year]) # If the month hasn't closed, the data is incomplete
          next
        end
        csv << [rev[:month], rev[:year].to_s, RECREATIONAL_SPECIAL_HEADER, rev[:retail_special]]
        csv << [rev[:month], rev[:year].to_s, RECREATIONAL_HEADER, rev[:retail] - rev[:retail_special]]
        csv << [rev[:month], rev[:year].to_s, MEDICAL_HEADER, rev[:medical]]
      end
    end
  end
end

class QuarterlyRevenue
  attr_reader :revenue

  def initialize(revenue)
    @revenue = revenue
  end

  def rollup
    sum_by_quarter.to_h.map do |k,h| 
      h[:quarter] = k[0]
      h[:year] = k[1]
      h
    end
  end

  private
  def group_by_quarter
    revenue.group_by{|e| [e[:quarter], e[:year]]}
  end

  def sum_by_quarter
    group_by_quarter.map do |key, array|
      [ key, calculate_sums(array) ]
    end
  end

  def calculate_sums(arry)
    arry.reduce( Hash.new{|h,k| h[k] = 0}) do |h, e| 
      h[:medical]+=e[:medical]
      h[:retail_special] += e[:retail_special]
      h[:retail] += e[:retail]
      h
    end
  end
end