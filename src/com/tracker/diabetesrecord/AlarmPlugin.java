package com.tracker.diabetesrecord;

import java.util.Calendar;
import java.util.GregorianCalendar;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Intent;
import android.provider.AlarmClock;

public class AlarmPlugin extends CordovaPlugin{
	CallbackContext mCallback;
	
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

		mCallback = callbackContext;
		if(action.equalsIgnoreCase("SET_ALARM")){
			int hour;
			String label = "Test BP/Sugar Now";
			/*Calendar cal = new GregorianCalendar();
			int minute, hour, day;
			
		    cal.setTimeInMillis(System.currentTimeMillis());
		    day = cal.get(Calendar.DAY_OF_WEEK);
		    hour = cal.get(Calendar.HOUR_OF_DAY);
		    minute = cal.get(Calendar.MINUTE);*/
			
			hour = args.getInt(0);
			label = args.getString(1);

		    Intent i = new Intent(AlarmClock.ACTION_SET_ALARM);
		    i.putExtra(AlarmClock.EXTRA_HOUR, hour);
		    i.putExtra(AlarmClock.EXTRA_MESSAGE, label);
		    i.putExtra(AlarmClock.EXTRA_SKIP_UI, true);
			
            cordova.getActivity().startActivity(i);
		}
		return true;
	}
}
