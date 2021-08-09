import pandas as pd
import matplotlib.pyplot as plt


#Graph plotting class
class   PlotGraph():


    def __init__(self,month,dataframe,charttype):

                    self.month = month
                    self.dataframe = dataframe
                    self.charttype = charttype


    def perform_plotting(self):
            if self.charttype == "normal":
                    self.dataframe["PKT"] = pd.to_datetime(self.dataframe["PKT"])
                    self.resultXY = self.dataframe[self.dataframe["PKT"].dt.month == self.month][["Max TemperatureC",
                                                                                                  "Min TemperatureC",]]
                    # self.result_days = self.dataframe[self.dataframe["PKT"].dt.month == self.month]["PKT"]
                    # self.result_days1 = self.dataframe["PKT"].dt.day

                    self.resultXY.plot(kind="barh",ylabel="Temperature",xlabel="Days",
                                       title="Highest and lowest readings for given month",
                                       width=0.5 )
                    return plt.show()

            elif self.charttype == "stacked":
                    self.dataframe["PKT"] = pd.to_datetime(self.dataframe["PKT"])
                    self.resultXY = self.dataframe[self.dataframe["PKT"].dt.month == self.month][["Max TemperatureC",
                                                                                              "Min TemperatureC"]]
                    self.resultXY.plot(kind="barh", ylabel="Temperature", xlabel="Days",
                                   title="Highest and lowest readings for given month",stacked=True)

                    return plt.show()
