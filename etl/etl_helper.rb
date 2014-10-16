require_relative "last_updated"

class ETLHelper
  def self.get_quarter(month)
    case month
    when 1..3
      1
    when 4..6
      2
    when 7..9
      3
    when 10..12
      4      
    else
      fail "Lol, wat? This shouldn't happen."
    end
  end

  def self.set_last_updated(type)
    LastUpdated.Set("crime")
  end

  def self.is_quarter_closed(year, quarter)
    today = Date.today
    this_year = today.year
    this_quarter = get_quarter(today.month)
    return ( year < this_year || (year == this_year && quarter < this_quarter) )
  end
end