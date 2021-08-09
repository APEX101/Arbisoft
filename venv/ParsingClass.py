import pandas as pd
import matplotlib.pyplot as plt


#Parsing Class
#Class returrning parseable file after storing in datafrane datastrucuture
class Parsing():


    def __init__(self,year):

        self.year = year


    def perform_parsing(self):

        if self.year == "2004":
             self.result = print("I read year 2004")
             v41 = pd.read_csv("weatherfiles/Murree_weather_2004_Aug.txt")
             v42 = pd.read_csv("weatherfiles/Murree_weather_2004_Dec.txt")
             v43 = pd.read_csv("weatherfiles/Murree_weather_2004_Jul.txt")
             v44 = pd.read_csv("weatherfiles/Murree_weather_2004_Jun.txt")
             v45 = pd.read_csv("weatherfiles/Murree_weather_2004_Nov.txt")
             v46 = pd.read_csv("weatherfiles/Murree_weather_2004_Oct.txt")
             v47 = pd.read_csv("weatherfiles/Murree_weather_2004_Sep.txt")
             frames = [v41, v42, v43 , v44 ,v45, v46, v47]
             concatted =     pd.concat(frames)
             self.result =  concatted

        elif self.year == "2005":
            self.result = print("I read year 2005")
            v41 = pd.read_csv("weatherfiles/Murree_weather_2005_Apr.txt")
            v42 = pd.read_csv("weatherfiles/Murree_weather_2005_Aug.txt")
            v43 = pd.read_csv("weatherfiles/Murree_weather_2005_Dec.txt")
            v44 = pd.read_csv("weatherfiles/Murree_weather_2005_Jan.txt")
            v45 = pd.read_csv("weatherfiles/Murree_weather_2005_Jul.txt")
            v46 = pd.read_csv("weatherfiles/Murree_weather_2005_Jun.txt")
            v47 = pd.read_csv("weatherfiles/Murree_weather_2005_May.txt")
            v48 = pd.read_csv("weatherfiles/Murree_weather_2005_Oct.txt")
            v49 = pd.read_csv("weatherfiles/Murree_weather_2005_Nov.txt")
            v50 = pd.read_csv("weatherfiles/Murree_weather_2005_Sep.txt")
            frames = [v41, v42, v43, v44, v45, v46, v47 ,v48,v49,v50]
            concatted = pd.concat(frames)
            self.result = concatted

        elif self.year == "2006":
            self.result = print("I read year 2006")
            v41 = pd.read_csv("weatherfiles/Murree_weather_2006_Apr.txt")
            v42 = pd.read_csv("weatherfiles/Murree_weather_2006_Aug.txt")
            v43 = pd.read_csv("weatherfiles/Murree_weather_2006_Dec.txt")
            v44 = pd.read_csv("weatherfiles/Murree_weather_2006_Feb.txt")
            v45 = pd.read_csv("weatherfiles/Murree_weather_2006_Jul.txt")
            v46 = pd.read_csv("weatherfiles/Murree_weather_2006_Jun.txt")
            v47 = pd.read_csv("weatherfiles/Murree_weather_2006_May.txt")
            v48 = pd.read_csv("weatherfiles/Murree_weather_2006_Oct.txt")
            v49 = pd.read_csv("weatherfiles/Murree_weather_2006_Nov.txt")
            v50 = pd.read_csv("weatherfiles/Murree_weather_2006_Sep.txt")
            v51 = pd.read_csv("weatherfiles/Murree_weather_2006_Jan.txt")
            v52 = pd.read_csv("weatherfiles/Murree_weather_2006_Mar.txt")
            frames = [v41, v42, v43, v44, v45, v46, v47, v48, v49, v50,v51,v52]
            concatted = pd.concat(frames)
            self.result = concatted

        elif self.year == "2007":
            self.result = print("I read year 2007")
            v41 = pd.read_csv("weatherfiles/Murree_weather_2007_Apr.txt")
            v42 = pd.read_csv("weatherfiles/Murree_weather_2007_Aug.txt")
            v43 = pd.read_csv("weatherfiles/Murree_weather_2007_Dec.txt")
            v44 = pd.read_csv("weatherfiles/Murree_weather_2007_Jan.txt")
            v45 = pd.read_csv("weatherfiles/Murree_weather_2007_Jul.txt")
            v46 = pd.read_csv("weatherfiles/Murree_weather_2007_Jun.txt")
            v47 = pd.read_csv("weatherfiles/Murree_weather_2007_May.txt")
            v48 = pd.read_csv("weatherfiles/Murree_weather_2007_Oct.txt")
            v49 = pd.read_csv("weatherfiles/Murree_weather_2007_Nov.txt")
            v50 = pd.read_csv("weatherfiles/Murree_weather_2007_Sep.txt")
            v51 = pd.read_csv("weatherfiles/Murree_weather_2007_Feb.txt")
            v52 = pd.read_csv("weatherfiles/Murree_weather_2007_Mar.txt")
            frames = [v41, v42, v43, v44, v45, v46, v47, v48, v49, v50,v51,v52]
            concatted = pd.concat(frames)
            self.result = concatted

        elif self.year == "2008":
            self.result = print("I read year 2008")
            v41 = pd.read_csv("weatherfiles/Murree_weather_2008_Apr.txt")
            v42 = pd.read_csv("weatherfiles/Murree_weather_2008_Aug.txt")
            v43 = pd.read_csv("weatherfiles/Murree_weather_2008_Dec.txt")
            v44 = pd.read_csv("weatherfiles/Murree_weather_2008_Jan.txt")
            v45 = pd.read_csv("weatherfiles/Murree_weather_2008_Jul.txt")
            v46 = pd.read_csv("weatherfiles/Murree_weather_2008_Jun.txt")
            v47 = pd.read_csv("weatherfiles/Murree_weather_2008_May.txt")
            v48 = pd.read_csv("weatherfiles/Murree_weather_2008_Oct.txt")
            v49 = pd.read_csv("weatherfiles/Murree_weather_2008_Nov.txt")
            v50 = pd.read_csv("weatherfiles/Murree_weather_2008_Sep.txt")
            v51 = pd.read_csv("weatherfiles/Murree_weather_2008_Feb.txt")
            v52 = pd.read_csv("weatherfiles/Murree_weather_2008_Mar.txt")
            frames = [v41, v42, v43, v44, v45, v46, v47, v48, v49, v50, v51, v52]
            concatted = pd.concat(frames)
            self.result = concatted

        elif self.year == "2009":
            self.result = print("I read year 2009")
            v41 = pd.read_csv("weatherfiles/Murree_weather_2009_Apr.txt")
            v42 = pd.read_csv("weatherfiles/Murree_weather_2009_Aug.txt")
            v43 = pd.read_csv("weatherfiles/Murree_weather_2009_Dec.txt")
            v44 = pd.read_csv("weatherfiles/Murree_weather_2009_Jan.txt")
            v45 = pd.read_csv("weatherfiles/Murree_weather_2009_Jul.txt")
            v46 = pd.read_csv("weatherfiles/Murree_weather_2009_Jun.txt")
            v47 = pd.read_csv("weatherfiles/Murree_weather_2009_May.txt")
            v48 = pd.read_csv("weatherfiles/Murree_weather_2009_Oct.txt")
            v49 = pd.read_csv("weatherfiles/Murree_weather_2009_Nov.txt")
            v50 = pd.read_csv("weatherfiles/Murree_weather_2009_Sep.txt")
            v51 = pd.read_csv("weatherfiles/Murree_weather_2009_Feb.txt")
            v52 = pd.read_csv("weatherfiles/Murree_weather_2009_Mar.txt")
            frames = [v41, v42, v43, v44, v45, v46, v47, v48, v49, v50, v51, v52]
            concatted = pd.concat(frames)
            self.result = concatted

        elif self.year == "2010":
            self.result = print("I read year 2010")
            v41 = pd.read_csv("weatherfiles/Murree_weather_2010_Apr.txt")
            v42 = pd.read_csv("weatherfiles/Murree_weather_2010_Aug.txt")
            v43 = pd.read_csv("weatherfiles/Murree_weather_2010_Dec.txt")
            v44 = pd.read_csv("weatherfiles/Murree_weather_2010_Jan.txt")
            v45 = pd.read_csv("weatherfiles/Murree_weather_2010_Jul.txt")
            v46 = pd.read_csv("weatherfiles/Murree_weather_2010_Jun.txt")
            v47 = pd.read_csv("weatherfiles/Murree_weather_2010_May.txt")
            v48 = pd.read_csv("weatherfiles/Murree_weather_2010_Oct.txt")
            v49 = pd.read_csv("weatherfiles/Murree_weather_2010_Nov.txt")
            v50 = pd.read_csv("weatherfiles/Murree_weather_2010_Sep.txt")
            v51 = pd.read_csv("weatherfiles/Murree_weather_2010_Feb.txt")
            v52 = pd.read_csv("weatherfiles/Murree_weather_2010_Mar.txt")
            frames = [v41, v42, v43, v44, v45, v46, v47, v48, v49, v50, v51, v52]
            concatted = pd.concat(frames)
            self.result = concatted

        elif self.year == "2011":
            self.result = print("I read year 2011")
            v41 = pd.read_csv("weatherfiles/Murree_weather_2011_Apr.txt")
            v42 = pd.read_csv("weatherfiles/Murree_weather_2011_Aug.txt")
            v43 = pd.read_csv("weatherfiles/Murree_weather_2011_Dec.txt")
            v44 = pd.read_csv("weatherfiles/Murree_weather_2011_Jan.txt")
            v45 = pd.read_csv("weatherfiles/Murree_weather_2011_Jul.txt")
            v46 = pd.read_csv("weatherfiles/Murree_weather_2011_Jun.txt")
            v47 = pd.read_csv("weatherfiles/Murree_weather_2011_May.txt")
            v48 = pd.read_csv("weatherfiles/Murree_weather_2011_Oct.txt")
            v49 = pd.read_csv("weatherfiles/Murree_weather_2011_Nov.txt")
            v50 = pd.read_csv("weatherfiles/Murree_weather_2011_Sep.txt")
            v51 = pd.read_csv("weatherfiles/Murree_weather_2011_Feb.txt")
            v52 = pd.read_csv("weatherfiles/Murree_weather_2011_Mar.txt")
            frames = [v41, v42, v43, v44, v45, v46, v47, v48, v49, v50, v51, v52]
            concatted = pd.concat(frames)
            self.result = concatted

        elif self.year == "2012":
            self.result = print("I read year 2012")
            v41 = pd.read_csv("weatherfiles/Murree_weather_2012_Apr.txt")
            v42 = pd.read_csv("weatherfiles/Murree_weather_2012_Aug.txt")
            v43 = pd.read_csv("weatherfiles/Murree_weather_2012_Dec.txt")
            v44 = pd.read_csv("weatherfiles/Murree_weather_2012_Jan.txt")
            v45 = pd.read_csv("weatherfiles/Murree_weather_2012_Jul.txt")
            v46 = pd.read_csv("weatherfiles/Murree_weather_2012_Jun.txt")
            v47 = pd.read_csv("weatherfiles/Murree_weather_2012_May.txt")
            v48 = pd.read_csv("weatherfiles/Murree_weather_2012_Oct.txt")
            v49 = pd.read_csv("weatherfiles/Murree_weather_2012_Nov.txt")
            v50 = pd.read_csv("weatherfiles/Murree_weather_2012_Sep.txt")
            v51 = pd.read_csv("weatherfiles/Murree_weather_2012_Feb.txt")
            v52 = pd.read_csv("weatherfiles/Murree_weather_2012_Mar.txt")
            frames = [v41, v42, v43, v44, v45, v46, v47, v48, v49, v50, v51, v52]
            concatted = pd.concat(frames)
            self.result = concatted

        elif self.year == "2013":
            self.result = print("I read year 2013")
            v41 = pd.read_csv("weatherfiles/Murree_weather_2013_Apr.txt")
            v42 = pd.read_csv("weatherfiles/Murree_weather_2013_Aug.txt")
            v43 = pd.read_csv("weatherfiles/Murree_weather_2013_Dec.txt")
            v44 = pd.read_csv("weatherfiles/Murree_weather_2013_Jan.txt")
            v45 = pd.read_csv("weatherfiles/Murree_weather_2013_Jul.txt")
            v46 = pd.read_csv("weatherfiles/Murree_weather_2013_Jun.txt")
            v47 = pd.read_csv("weatherfiles/Murree_weather_2013_May.txt")
            v48 = pd.read_csv("weatherfiles/Murree_weather_2013_Oct.txt")
            v49 = pd.read_csv("weatherfiles/Murree_weather_2013_Nov.txt")
            v50 = pd.read_csv("weatherfiles/Murree_weather_2013_Sep.txt")
            v51 = pd.read_csv("weatherfiles/Murree_weather_2013_Feb.txt")
            v52 = pd.read_csv("weatherfiles/Murree_weather_2013_Mar.txt")
            frames = [v41, v42, v43, v44, v45, v46, v47, v48, v49, v50, v51, v52]
            concatted = pd.concat(frames)
            self.result = concatted

        elif self.year == "2014":
            self.result = print("I read year 2014")
            v41 = pd.read_csv("weatherfiles/Murree_weather_2014_Apr.txt")
            v42 = pd.read_csv("weatherfiles/Murree_weather_2014_Aug.txt")
            v43 = pd.read_csv("weatherfiles/Murree_weather_2014_Dec.txt")
            v44 = pd.read_csv("weatherfiles/Murree_weather_2014_Jan.txt")
            v45 = pd.read_csv("weatherfiles/Murree_weather_2014_Jul.txt")
            v46 = pd.read_csv("weatherfiles/Murree_weather_2014_Jun.txt")
            v47 = pd.read_csv("weatherfiles/Murree_weather_2014_May.txt")
            v48 = pd.read_csv("weatherfiles/Murree_weather_2014_Oct.txt")
            v49 = pd.read_csv("weatherfiles/Murree_weather_2014_Nov.txt")
            v50 = pd.read_csv("weatherfiles/Murree_weather_2014_Sep.txt")
            v51 = pd.read_csv("weatherfiles/Murree_weather_2014_Feb.txt")
            v52 = pd.read_csv("weatherfiles/Murree_weather_2014_Mar.txt")
            frames = [v41, v42, v43, v44, v45, v46, v47, v48, v49, v50, v51, v52]
            concatted = pd.concat(frames)
            self.result = concatted

        elif self.year == "2015":
            self.result = print("I read year 2015")
            v41 = pd.read_csv("weatherfiles/Murree_weather_2015_Apr.txt")
            v42 = pd.read_csv("weatherfiles/Murree_weather_2015_Aug.txt")
            v43 = pd.read_csv("weatherfiles/Murree_weather_2015_Dec.txt")
            v44 = pd.read_csv("weatherfiles/Murree_weather_2015_Jan.txt")
            v45 = pd.read_csv("weatherfiles/Murree_weather_2015_Jul.txt")
            v46 = pd.read_csv("weatherfiles/Murree_weather_2015_Jun.txt")
            v47 = pd.read_csv("weatherfiles/Murree_weather_2015_May.txt")
            v48 = pd.read_csv("weatherfiles/Murree_weather_2015_Oct.txt")
            v49 = pd.read_csv("weatherfiles/Murree_weather_2015_Nov.txt")
            v50 = pd.read_csv("weatherfiles/Murree_weather_2015_Sep.txt")
            v51 = pd.read_csv("weatherfiles/Murree_weather_2015_Feb.txt")
            v52 = pd.read_csv("weatherfiles/Murree_weather_2015_Mar.txt")
            frames = [v41, v42, v43, v44, v45, v46, v47, v48, v49, v50, v51, v52]
            concatted = pd.concat(frames)
            self.result = concatted

        elif self.year == "2016":
            self.result = print("I read year 2016")
            v41 = pd.read_csv("weatherfiles/Murree_weather_2016_Apr.txt")
            v42 = pd.read_csv("weatherfiles/Murree_weather_2016_Aug.txt")
            v43 = pd.read_csv("weatherfiles/Murree_weather_2016_Jan.txt")
            v44 = pd.read_csv("weatherfiles/Murree_weather_2016_Jul.txt")
            v45 = pd.read_csv("weatherfiles/Murree_weather_2016_Jun.txt")
            v46 = pd.read_csv("weatherfiles/Murree_weather_2016_May.txt")
            v47 = pd.read_csv("weatherfiles/Murree_weather_2016_Sep.txt")
            v48 = pd.read_csv("weatherfiles/Murree_weather_2016_Feb.txt")
            v49 = pd.read_csv("weatherfiles/Murree_weather_2016_Mar.txt")
            frames = [v41, v42, v43, v44, v45, v46, v47, v48, v49]

            concatted = pd.concat(frames)
            self.result = concatted

        return self.result