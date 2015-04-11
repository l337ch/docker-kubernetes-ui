angular.module("kubernetesApp.config", [])

.constant("ENV", {
	"/": {
		"k8sApiServer": "http://172.16.1.102:8080/api/v1beta2",
		"k8sDataServer": "http://172.16.1.102:5555/cluster",
		"k8sDataPollMinIntervalSec": 10,
		"k8sDataPollMaxIntervalSec": 120,
		"k8sDataPollErrorThreshold": 5,
		"cAdvisorProxy": "",
		"cAdvisorPort": "4194"
	}
})

.constant("ngConstant", true)

;