require "csv"

class LastUpdated
  FILE = "data/updated.csv"

  def self.Set(section)
    updates = fetch_contents
    updates[section] = today_formatted
    write_contents(updates)
  end

  private
  def self.fetch_contents
    contents = {}
    CSV.foreach(FILE, :headers => true) do |row|
      contents[row[0]] = row[1]
    end
    contents
  end

  def self.write_contents(contents)
    header = ["section", "updated"]
    CSV.open(FILE, "wb") do |csv|
      csv << header
      contents.keys.each do |key|
        csv << [key, contents[key]]
      end
    end
  end

  def self.today_formatted
    today = Date.today
    today.month.to_s + "/" + today.year.to_s
  end
end