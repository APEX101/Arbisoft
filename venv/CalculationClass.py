import pandas as pd


#Query Analysis Calculation Class
class Calculations():

    def __init__(self,  dataframe,query):
        self.dataframe = dataframe
        self.query = query

    def perform_calculations_yearly(self):

                 if self.query=="high_temp":
                     self.result=print("\nI read high tempereature query\n")
                     # self.result =  self.dataframe["Max TemperatureC"].max()
                     self.result1 = self.dataframe.iloc[self.dataframe['Max TemperatureC'].argmax()]
                     self.result = self.result1[["Max TemperatureC","PKT"]]

                 elif self.query=="low_temp":
                    self.result=print("\nI read low temperature query\n")
                     # self.result = self.dataframe["Min TemperatureC"].min()
                    self.result1 = self.dataframe.iloc[self.dataframe['Min TemperatureC'].argmin()]
                    self.result = self.result1[["Min TemperatureC", "PKT"]]

                 elif self.query == "most_humidity":
                     self.result = print("\nI read most humidity\n")
                     # self.result = self.dataframe["Max Humidity"].max()
                     self.result1 = self.dataframe.iloc[self.dataframe["Max Humidity"].argmax()]
                     self.result = self.result1[["Max Humidity", "PKT"]]

                 return self.result


    def perform_calculations_monthly(self,month):

                 if self.query == "avg_high_temp":
                    self.result = print("\nI did average high_temp read\n")
                    # Conversion in datetime format
                    self.dataframe["PKT"] = pd.to_datetime(self.dataframe["PKT"])
                    self.result = self.dataframe[self.dataframe["PKT"].dt.month == month]["Mean TemperatureC"].max()

                 elif self.query == "avg_low_temp":
                    self.result = print("\nI did low_temp read\n")
                    self.result = self.dataframe[self.dataframe["PKT"].dt.month == month]["Mean TemperatureC"].min()

                 elif self.query == "avg_humidity":
                    self.result = print("\nI did avg_humidity read\n")
                    self.result = self.dataframe[self.dataframe["PKT"].dt.month == month][" Mean Humidity"].mean()

                 return self.result
