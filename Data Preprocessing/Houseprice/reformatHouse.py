#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat May 13 16:16:22 2023

@author: starry
"""

def extractPossiblePlace(placename):
    if " - " in placename:
        return placename.split(" - ")[0]
    else:
        return placename


import os,json

input_file = '/Users/starry/Desktop/COMP90024Assignment2/Houseprice/MedianHousePrice.json'
sal = json.load(open('/Users/starry/Desktop/COMP90024Assignment2/Houseprice/sal.json', 'r'))
gccs = list(set([sal[key]['gcc'] for key in sal]))
greater_gccs = [gcc for gcc in gccs if gcc[1] != 'r']



counter = 0
write_file = open(f"geo-houseprice-{counter}.json", 'w')
json_to_write = {"docs": list()}
statistical_location = json.load(open(input_file, 'r'))
hos_list = []
for area in statistical_location['features']:
    suburb = area['properties']['sa2_name_2016']
    # valid address check by whether there is a postcode at last
    if suburb:
        reform_house = {}
        reform_house['id'] = area['id']
        reform_house['area_name'] = area['properties']['sa2_name_2016']
        try:
            reform_house['gcc'] = sal[suburb.lower()]['gcc']
        except KeyError:
            try:
                new_lookup_sub = extractPossiblePlace(suburb)
                reform_house['gcc'] = sal[new_lookup_sub.lower()]['gcc']
            except KeyError:
                for key in sal:
                    possible_sub = new_lookup_sub.lower().split() 
                    if possible_sub[0] in key:
                        reform_house['gcc'] = sal[key]['gcc']
        reform_house['median_sale_price'] = area['properties']['rsdntl_prprty_prcs_yr_endd_30_jne_hss_mdn_sle_prce']
        json_to_write["docs"].append(reform_house)
        
    if len(json_to_write["docs"]) > 1000:
        write_file.write(json.dumps(json_to_write))
        json_to_write = {"docs": list()}
        write_file.close()
        counter += 1
        write_file = open(f'geo-houseprice-{counter}.json', 'w')
write_file.write(json.dumps(json_to_write))