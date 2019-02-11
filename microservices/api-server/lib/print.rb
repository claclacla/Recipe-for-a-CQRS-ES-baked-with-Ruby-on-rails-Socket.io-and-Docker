module Print
  def self.error code:, message:
    puts "==============================================="
    puts "Error time: " + Time.now.strftime("%d/%m/%Y %H:%M").to_s
    puts "Error code: " + code.to_s
    puts ""
    puts message
    puts "==============================================="
  end
end