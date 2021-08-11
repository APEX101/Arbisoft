from parsing_class import FileParsing
from calculation_class import QueryCalculations
from plotting_class import PlotGraph


# Returning concated dataframes for the given year
df = FileParsing(year="2016")
df = df.perform_parsing()
# print(df)


# Returning Calculated results for the given query
calculate_high_temp = QueryCalculations(df, query="high_temp")
calculate_high_temp = calculate_high_temp.perform_calculations_yearly()
print((calculate_high_temp))

calculate_low_temp = QueryCalculations(df, query="low_temp")
calculate_low_temp = calculate_low_temp.perform_calculations_yearly()
print((calculate_low_temp))
#
calculate_humidity = QueryCalculations(df, query="most_humidity")
calculate_humidity = calculate_humidity.perform_calculations_yearly()
print((calculate_humidity))

# Monthly Queries
avg_high_temp = QueryCalculations(df, query="avg_high_temp")
avg_high_temp = avg_high_temp.perform_calculations_monthly(month=6)
print("Average highest temperature for given month is {}".format(avg_high_temp))

avg_low_temp = QueryCalculations(df, query="avg_low_temp")
avg_low_temp = avg_low_temp.perform_calculations_monthly(month=6)
print("Average lowest temperature for given month is {}".format(avg_low_temp))

avg_humidity = QueryCalculations(df, query="avg_humidity")
avg_humidity = avg_humidity.perform_calculations_monthly(month=6)
print("Average humidity for given month is {}".format(avg_humidity))


# Plotting For Given year and given month
drawing = PlotGraph(dataframe=df, month=5, charttype="normal")
drawing = drawing.perform_plotting()
print(drawing)

drawing2 = PlotGraph(dataframe=df, month=5, charttype="stacked")
drawing2 = drawing2.perform_plotting()
print(drawing2)
