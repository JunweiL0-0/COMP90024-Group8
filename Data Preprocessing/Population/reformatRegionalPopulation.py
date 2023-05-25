#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri May 19 08:53:00 2023

@author: starry
"""



import os,json

input_file = '/Users/starry/Desktop/COMP90024Assignment2/Population/RegionalPopulation.json'
sal = json.load(open('/Users/starry/Desktop/COMP90024Assignment2/Population/sal.json', 'r'))
gccs = list(set([sal[key]['gcc'] for key in sal]))
greater_gccs = [gcc for gcc in gccs if gcc[1] != 'r']


def extractPossiblePlace(placename):
    if " - " in placename:
        return placename.split(" - ")[0]
    else:
        return placename


counter = 0
write_file = open(f"geo-population-{counter}.json", 'w')
json_to_write = {"docs": list()}
statistical_location = json.load(open(input_file, 'r'))
hos_list = []
for area in statistical_location['features']:
    suburb = area['properties']['sa2_name16']
    # valid address check by whether there is a postcode at last
    if suburb:
        reform_population = {}
        reform_population['id'] = area['id']
        reform_population['area_name'] = area['properties']['sa2_name16']
        reform_population['state_name'] = area['properties']['state_name']
        try:
            reform_population['gcc'] = sal[suburb.lower()]['gcc']
        except KeyError:
            try:
                new_lookup_sub = extractPossiblePlace(suburb)
                reform_population['gcc'] = sal[new_lookup_sub.lower()]['gcc']
            except KeyError:
                for key in sal:
                    possible_sub = new_lookup_sub.lower().split() 
                    if possible_sub[0] in key:
                        reform_population['gcc'] = sal[key]['gcc']
        
        reform_population['Total_population'] = area['properties']['persons_total']
        json_to_write["docs"].append(reform_population)
        
    if len(json_to_write["docs"]) > 1000:
        write_file.write(json.dumps(json_to_write))
        json_to_write = {"docs": list()}
        write_file.close()
        counter += 1
        write_file = open(f'geo-population-{counter}.json', 'w')
write_file.write(json.dumps(json_to_write))