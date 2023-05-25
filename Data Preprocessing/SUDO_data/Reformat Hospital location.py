#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri May 12 15:39:12 2023

@author: starry
"""

import os,json

input_file = '/Users/starry/Desktop/COMP90024Assignment2/SUDO_data/Hospital_statistics.json'
sal = json.load(open('/Users/starry/Desktop/COMP90024Assignment2/SUDO_data/sal.json', 'r'))
gccs = list(set([sal[key]['gcc'] for key in sal]))
greater_gccs = [gcc for gcc in gccs if gcc[1] != 'r']
        
def reformatPlacename(suburb, state):
    state_mapping = {
        'ACT': 'Australian Capital Territory',
        'NSW': 'New South Wales',
        'NT': 'Northern Territory',
        'QLD': 'Queensland',
        'SA': 'South Australia',
        'TAS': 'Tasmania',
        'VIC': 'Victoria',
        'WA': 'Western Australia'
    }
    state_fullname = state_mapping[state]
    place_name = suburb[:-5] + ", " + state_fullname
    return place_name

def reformatNTPlacename(suburb, state):
    state_fullname = 'Northern Territory'
    place_name = suburb[:-4] + ", " + state_fullname

counter = 0
write_file = open(f"geo-hospital-{counter}.json", 'w')
json_to_write = {"docs": list()}
hospital_location = json.load(open(input_file, 'r'))
hos_list = []
for hospital in hospital_location['features']:
    place = hospital['properties']['address_line_2']
    if place:
        postcode = place.split()[-1]
        if len(postcode) == 4:
            suburb = place
            reform_hos = {}
            reform_hos['id'] = hospital['id']
            reform_hos['hospital_name'] = hospital['properties']['hospname']
            suburb = hospital['properties']['address_line_2']
            state_short = hospital['properties']['state']
            full_place = reformatPlacename(suburb, state_short)
            reform_hos['area_name'] = full_place
            try:
                reform_hos['gcc'] = sal[suburb[:-5].lower()]['gcc']
            except KeyError:
                new_lookup_sub = suburb[:-5].lower() + " (" + hospital['properties']['state'].lower() +")"
            reform_hos['longitude'] = hospital['properties']['longitude']
            reform_hos['latitude'] = hospital['properties']['latitude']
            
        elif len(postcode) == 3:
            nsuburb = place
            reform_hos = {}
            reform_hos['id'] = hospital['id']
            reform_hos['hospital_name'] = hospital['properties']['hospname']
            nsuburb = hospital['properties']['address_line_2']
            state_short = hospital['properties']['state']
            full_place = reformatNTPlacename(nsuburb, state_short)
            reform_hos['area_name'] = full_place
            reform_hos['gcc'] = sal[nsuburb[:-4].lower()]['gcc']
            reform_hos['longitude'] = hospital['properties']['longitude']
            reform_hos['latitude'] = hospital['properties']['latitude']

        json_to_write["docs"].append(reform_hos)
        
    if len(json_to_write["docs"]) > 1000:
        write_file.write(json.dumps(json_to_write))
        json_to_write = {"docs": list()}
        write_file.close()
        counter += 1
        write_file = open(f'geo-twitter-{counter}.json', 'w')
write_file.write(json.dumps(json_to_write))
