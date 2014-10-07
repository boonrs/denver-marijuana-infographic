require_relative "etl/fetch_revenue"
require_relative "etl/fetch_facilities"
require_relative "etl/fetch_crime"

desc "Get revenue data from Denver open data portal"
task :revenue do
  FetchRevenue.execute
end

desc "Get facilities data from Denver open data portal"
task :facilities do
  FetchFacilities.execute
end

desc "Get crime data from Denver open data portal"
task :crime do
  FetchCrime.execute
end

task :default => [:facilities, :revenue, :crime]