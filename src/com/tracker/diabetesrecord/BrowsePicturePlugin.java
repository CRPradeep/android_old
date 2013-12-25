package com.tracker.diabetesrecord;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.Log;

public class BrowsePicturePlugin extends CordovaPlugin {

	// this is the action code we use in our intent, 
	// this way we know we're looking at the response from our own action
	private static final int SELECT_PICTURE = 12345;

	private String selectedImagePath;
	private CallbackContext callback;
	
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

		// in onCreate or any event where your want the user to
		// select a file
		callback = callbackContext;
		if(action.equalsIgnoreCase("OPEN_GALLERY")){
			cordova.getThreadPool().execute(new Runnable() {
	            public void run() {
	            	Intent intent = new Intent();
	    			intent.setType("image/*");
	    			intent.setAction(Intent.ACTION_GET_CONTENT);
	    			cordova.getActivity().startActivityForResult(Intent.createChooser(intent,
	    					"Select Picture"), SELECT_PICTURE);
	            }
	        });			
		}
		return true;
	}

	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent intent) {
		super.onActivityResult(requestCode, resultCode, intent);
		Log.e(getClass().getSimpleName()+"---requestCode", requestCode+"");
		if (resultCode == Activity.RESULT_OK) {
			if (requestCode == SELECT_PICTURE) {
				Uri selectedImageUri = intent.getData();
				selectedImagePath = getPath(selectedImageUri);
				Log.e(getClass().getSimpleName()+"---image_path", selectedImagePath);
				callback.success(selectedImagePath);
			}
		}
	}
	
	/*public void onActivityResult(int requestCode, int resultCode, Intent data) {
		Log.e(getClass().getSimpleName()+"---requestCode", requestCode+"");
		cordova.getActivity();
		if (resultCode == Activity.RESULT_OK) {
			if (requestCode == SELECT_PICTURE) {
				Uri selectedImageUri = data.getData();
				selectedImagePath = getPath(selectedImageUri);
				Log.e(getClass().getSimpleName()+"---image_path", selectedImagePath);
				callback.success(selectedImagePath);
			}
		}
	}*/

	/**
	 * helper to retrieve the path of an image URI
	 */
	public String getPath(Uri uri) {
		// just some safety built in 
		if( uri == null ) {
			// TODO perform some logging or show user feedback
			return null;
		}
		// try to retrieve the image from the media store first
		// this will only work for images selected from gallery
		String[] projection = { MediaStore.Images.Media.DATA };
		Cursor cursor = cordova.getActivity().managedQuery(uri, projection, null, null, null);
		if( cursor != null ){
			int column_index = cursor
					.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
			cursor.moveToFirst();
			return cursor.getString(column_index);
		}
		// this is our fallback here
		return uri.getPath();
	}

}
