import json
from collections import defaultdict


def get_sal_data_list(sal_file_path):
    """
    :param sal_file_path: A string represent the path to the sal_file

    return a dictionary which key if the gcc and value is the place_full_name
    """
    with open(sal_file_path, 'r') as f:
        result = defaultdict(set)
        for i in json.load(f).items():
            # all to lowercase and remove all white spaces before and after
            place_full_name = i[0].lower().strip()
            gcc_code = i[1]["gcc"]
            result[gcc_code].add(place_full_name)
        return result


def get_place_code(place_full_name, sal_list):
    """
    :param place_full_name: A string represent the name of the place
    :param sal_list: [{gcc: place_names}]

    Test the place_full_name against the sal_list.
    Return place code.
    """
    # We can predefine the gcc names here for later referencing.
    # Split it into parts and remove all white spaces before and after to find the exact match
    place_full_name = [x.strip() for x in place_full_name.lower().split(',')]
    if len(place_full_name) == 1:  # if contains no comma
        for gcc_code, sal_place_name in sal_list.items():
            for sal_place in sal_place_name:
                if place_full_name[0] in sal_place:
                    return gcc_code
    elif len(place_full_name) == 2:  # if contains comma
        for gcc_code, sal_place_name in sal_list.items():
            for sal_place in sal_place_name:
                if place_full_name[0] in sal_place or place_full_name[1] in sal_place:
                    return gcc_code
    return None


def get_words(file_path):
    with open(file_path, "r") as file:
        words = json.load(file)['words']
        result = set()
        for word in words:
            word = set([x.strip() for x in word.split()])
            result = result.union(word)
            return result
