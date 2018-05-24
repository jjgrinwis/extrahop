url = 'https://eda.t-i.demo/api/v1/devicegroups'
metrics_url = 'https://eda.t-i.demo/api/v1/metrics/total'
headers = {'Authorization': 'ExtraHop apikey=8b03000cd25d427c9f6a51c9e96672bc',
           'Accept': 'application/json'}

# json payload to lookup metrics we've defined
# we're going to lookup all connections from the last day with 5min interval
# object_ids should be added with group_id
metrics_payload = {
	"cycle": "5min",
	"from": "-24h",
	"until": "0m",
	"metric_category": "custom_detail",
	"object_type": "device_group",
    "metric_specs": [{
			"name": "server_app_metrics_src_dst_proto_port"
		},
		{
			"name": "client_app_metrics_src_extdst_proto_port"
		},
		{
			"name": "client_app_metrics_src_dst_proto_port"
		}
	],
	"object_ids": [
	]
}