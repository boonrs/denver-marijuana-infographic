require "csv"
require "open-uri"
require "fileutils"
require_relative "etl_helper"

class FetchCrime
  URL = "http://data.denvergov.org/download/gis/crime/csv/crime.csv"
  FOLDER = "data/"
  LOCAL = FOLDER + "crime.csv"

  def self.execute
    begin
      crimes = fetch_csv
      create_csv(crimes)

      ETLHelper.set_last_updated("crime")
    rescue
      puts "Error fetching crime data: #{$!}"
    end
  end

  private
  def self.fetch_csv
    crimes = Array.new
    headers = ["INCIDENT_ID","OFFENSE_ID","OFFENSE_CODE","OFFENSE_CODE_EXTENSION","OFFENSE_TYPE_ID","OFFENSE_CATEGORY_ID",
      "FIRST_OCCURRENCE_DATE","LAST_OCCURRENCE_DATE","REPORTED_DATE","INCIDENT_ADDRESS","GEO_X","GEO_Y","GEO_LON","GEO_LAT",
      "DISTRICT_ID","PRECINCT_ID","NEIGHBORHOOD_ID"]

    CSV.new(open(URL), :headers => :true).each do |line|
      offense_types = {"drug-marijuana-cultivation" => "Cultivation", "drug-marijuana-possess" => "Possession", "drug-marijuana-sell" => "Sale"}
      offense_type = line["OFFENSE_TYPE_ID"]

      if offense_types.keys.include?(offense_type) # We only want mj data
        dt = Date.strptime(line["REPORTED_DATE"].strip, '%Y-%m-%d')
        quarter = ETLHelper.get_quarter(dt.month)
        crimes << {:quarter => quarter, :year => dt.year, :series => offense_types[offense_type]}
      end
    end

    crimes
  end

  def self.fetch_local_csv
    crimes = Array.new
    headers = ["INCIDENT_ID","OFFENSE_ID","OFFENSE_CODE","OFFENSE_CODE_EXTENSION","OFFENSE_TYPE_ID","OFFENSE_CATEGORY_ID",
      "FIRST_OCCURRENCE_DATE","LAST_OCCURRENCE_DATE","REPORTED_DATE","INCIDENT_ADDRESS","GEO_X","GEO_Y","GEO_LON","GEO_LAT",
      "DISTRICT_ID","PRECINCT_ID","NEIGHBORHOOD_ID"]

    CSV.open(LOCAL, :headers => true).each do |line|
      offense_types = {"drug-marijuana-cultivation" => "Cultivation", "drug-marijuana-possess" => "Possession", "drug-marijuana-sell" => "Sale"}
      offense_type = line["OFFENSE_TYPE_ID"]

      if offense_types.keys.include?(offense_type) # We only want mj data
        dt = Date.strptime(line["REPORTED_DATE"].strip, '%Y-%m-%d')
        quarter = ETLHelper.get_quarter(dt.month)
        crimes << {:quarter => quarter, :year => dt.year, :series => offense_types[offense_type]}
      end
    end

    crimes
  end

  def self.create_csv(crimes)
    title = "open-crime"
    path = FOLDER + title + ".csv"
    headers = ["Quarter","q","year","Series","Total"]

    data = QuarterlyCrime.new(crimes).rollup
    CSV.open(path, "wb") do |csv|
      csv << headers
      data.each do |crime|
        quarter = "Q" + crime[0].to_s
        quarter_and_year = quarter + ' ' + crime[1].to_s
        csv << [quarter_and_year, quarter, crime[1], crime[2], crime[3]]
      end
    end
  end
end

class QuarterlyCrime
  attr_reader :crimes

  def initialize(crimes)
    @crimes = crimes
  end

  def rollup
    sort(find_gaps_in_collection)
  end

  private
  def group_by_quarter
    @crimes.group_by{|e| [e[:quarter], e[:year], e[:series]]}
  end

  def sum_by_quarter
    group_by_quarter.map do |key, array|
      [key, array.length]
    end
  end

  def find_gaps_in_collection
    # graphs display wonky if data doesn't exist for each quarter
    sorted = sort(sum_by_quarter.map{|a| a.flatten})
    fill_in_the_blanks(sorted, "Possession")
    fill_in_the_blanks(sorted, "Cultivation")
    fill_in_the_blanks(sorted, "Sale")
    sorted
  end


  # TODO: Refactor, so ugly
  def fill_in_the_blanks(sorted, crime_type)
    last_quarter = Quarterly.new(sorted.last[0], sorted.last[1])
    quarter = Quarterly.new(sorted.first[0], sorted.first[1])
    while quarter.less_than_or_equal_to(last_quarter) 
      add_if_missing(sorted, quarter, crime_type)
      quarter.next
    end
  end

  def add_if_missing(sorted, quarterly, crime_type)
    has_it = sorted.select {|s| s[0] == quarterly.quarter && s[1] == quarterly.year && s[2] == crime_type}.first
    unless(has_it)
      sorted << [quarterly.quarter, quarterly.year, crime_type, 0]
    end
  end

  def sort(crimes)
    crimes.sort_by{|c| [c[1], c[0]]}
  end
end

class Quarterly
  attr_reader :year, :quarter

  def initialize(quarter, year)
    @year = year
    @quarter = quarter
  end

  def next
    (@quarter < 4)? @quarter += 1 : @quarter = 1
    @year +=1 if @quarter == 1
  end

  def less_than_or_equal_to (quarterly)
    ( year < quarterly.year || (year == quarterly.year && quarter <= quarterly.quarter))
  end 
end