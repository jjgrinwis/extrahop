import requests
from parameters import *


def get_group_id(group_name):
    """"return group id """
    payload = {'name': group_name}

    # lets try to lookup id group_name
    try:
        # most request parameters defined in parameters.py
        r = requests.get(url, params=payload, verify=False, headers=headers)
    except requests.exceptions.RequestException as e:
        print(e)
        exit(1)
    else:
        if len(r.json()) == 1:
            group_id = r.json()[0]['id']
            print("found id: " + str(group_id))
            return group_id
        else:
            print("device_group name too general or not found:")
            exit(1)


def get_metric_list():
    """should return list of metrics"""

    # try the post. Only check the post in try
    try:
        r = requests.post(metrics_url, json=metrics_payload, verify=False, headers=headers)
    except requests.exceptions.RequestException as e:
        print(e)
        exit(1)
    else:
        for metric in (r.json()['stats'][0]['values']):
            print("metric: " + metric[0]['key']['str'])
            for value in (metric[0]['value']):
                print(value['key']['str'])


def main():
    device_group = "active"
    requests.packages.urllib3.disable_warnings()

    # get id and push on metrics_payload
    metrics_payload['object_ids'].append(get_group_id(device_group))
    get_metric_list()


if __name__ == "__main__":
    main()
