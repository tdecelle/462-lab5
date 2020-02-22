ruleset sensor_profile {
	
	meta {
		provides get_profile
		shares get_profile
	}

	global {
		get_profile = function() {
			{
				"sms": ent:sms.defaultsTo("19134019979"),
				"location": ent:sensor_location.defaultsTo("None"),
				"name": ent:sensor_name.defaultsTo("None"),
				"high_temperature": ent:high_temperature.defaultsTo("80")
			}
		}
	}

	rule profile_updated {
		select when sensor profile_updated

		always {
			ent:sensor_location := event:attr("location").klog("sensor_location").head()
			ent:sensor_name := event:attr("name").klog("sensor_name").head()
			ent:sms := event:attr("sms").defaultsTo(ent:sms.defaultsTo("19134019979")).klog("sms").head()
			ent:high_temperature := event:attr("high_temperature").defaultsTo(ent:high_temperature.defaultsTo("80")).klog("high_temperature").head()
		}
	}
}
