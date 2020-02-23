ruleset sensor_profile {
	
	meta {
		provides get_profile, get_threshold, get_sms
		shares get_profile, get_threshold, get_sms
	}

	global {
		get_profile = function() {
			{
				"sms": ent:sms.defaultsTo("19134019979"),
				"location": ent:sensor_location.defaultsTo("None"),
				"name": ent:sensor_name.defaultsTo("None"),
				"high_temperature": ent:temperature_threshold.defaultsTo(80)
			}
		}

		get_threshold = function() {
			ent:temperature_threshold.defaultsTo(80)
		}

		get_sms = function() {
			ent:sms.defaultsTo("19134019979")
		}
	}

	rule profile_updated {
		select when sensor profile_updated

		always {
			ent:sensor_location := event:attr("location").klog("sensor_location").head()
			ent:sensor_name := event:attr("name").klog("sensor_name").head()
			ent:sms := event:attr("sms").defaultsTo(ent:sms.defaultsTo("19134019979")).klog("sms").head()
			ent:temperature_threshold := event:attr("high_temperature").as("Number").defaultsTo(ent:temperature_threshold.defaultsTo(80)).klog("high_temperature").head()
		}
	}
}
