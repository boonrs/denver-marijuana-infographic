require "csv"
require "open-uri"

class FetchFacilities
  URL = "http://data.denvergov.org/download/gis/marijuana_facilities/csv/marijuana_facilities.csv"
  FOLDER = "data/"
  BIG_PATH = FOLDER + "facilities-licenses-big.csv"
  LICENSES_PATH = FOLDER + "facilities-licenses-pie-graph.csv"
  LOCATIONS_PATH = FOLDER + "facilities-locations-venn-graph.csv"

  def self.execute
    begin
      facilities = fetch_csv
      create_csvs(facilities)

      ETLHelper.set_last_updated("facilities")
    rescue
      puts "Error fetching facilities data: #{$!}"
    end
  end

  private
  def self.fetch_csv
    facilities = Array.new
    headers = ["BUSINESS_NAME","ADDRESS","LICENSE_TYPE"]
    CSV.foreach(open(URL), :headers => true).each do |line|
      facilities << {:name=> line["BUSINESS_NAME"].strip, :address => line["ADDRESS"].strip, :type=>line["LICENSE_TYPE"].strip}
    end
    facilities
  end

  def self.create_csvs(facilities)
    data = FacilitiesCount.new(facilities).rollup
    create_big_number_csv(data)
    create_licenses_csv(data)
    create_locations()
  end

  def self.create_locations()
    headers = ["label", "size"]
    CSV.open(LOCATIONS_PATH, "wb") do |csv|
      csv << headers
      # Hard coded for now
      csv << ["Recreational", 100]
      csv << ["Medical", 120]
      csv << ["Medical and Recreational", 95]
    end
  end

  def self.create_big_number_csv(facilities)
    headers = ["big"]
    CSV.open(BIG_PATH, "wb") do |csv|
      csv << headers
      csv << [sum_facilities(facilities)]
    end
  end

  def self.sum_facilities(facilities)
    facilities.map(&:last).inject(:+)
  end

  def self.create_licenses_csv(facilities)
    headers = ["label", "value"]

    CSV.open(LICENSES_PATH, "wb") do |csv|
      csv << headers
      facilities.each do |f|
        csv << f
      end
    end
  end
end

class FacilitiesCount
  attr_reader :facilities

  def initialize(facilities)
    @facilities = facilities
  end

  def rollup
    sum_by_type
  end

  private
  def group_by_type
    rollup = facilities.group_by{|f| f[:type]}
  end

  def sum_by_type
    group_by_type.map do |key, array|
      [key, array.length]
    end
  end
end