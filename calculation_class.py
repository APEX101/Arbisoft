import pandas as pd


class QueryCalculations:
    def __init__(self, dataframe, query):
        self.dataframe = dataframe
        self.query = query

    def perform_calculations_yearly(self):

        if self.query == "high_temp":
            self.result1 = self.dataframe.iloc[
                self.dataframe["Max TemperatureC"].argmax()
            ]
            self.result = self.result1[["Max TemperatureC", "PKT"]]

        elif self.query == "low_temp":
            self.result1 = self.dataframe.iloc[
                self.dataframe["Min TemperatureC"].argmin()
            ]
            self.result = self.result1[["Min TemperatureC", "PKT"]]

        elif self.query == "most_humidity":
            self.result1 = self.dataframe.iloc[self.dataframe["Max Humidity"].argmax()]
            self.result = self.result1[["Max Humidity", "PKT"]]

        return self.result

    def perform_calculations_monthly(self, month):

        if self.query == "avg_high_temp":
            # Conversion in datetime format
            self.dataframe["PKT"] = pd.to_datetime(self.dataframe["PKT"])
            self.result = self.dataframe[self.dataframe["PKT"].dt.month == month][
                "Mean TemperatureC"
            ].max()

        elif self.query == "avg_low_temp":
            self.result = self.dataframe[self.dataframe["PKT"].dt.month == month][
                "Mean TemperatureC"
            ].min()

        elif self.query == "avg_humidity":
            self.result = self.dataframe[self.dataframe["PKT"].dt.month == month][
                " Mean Humidity"
            ].mean()

        return self.result
