package com.example.benjamin.rankenstein;



import android.app.Dialog;
import android.app.DialogFragment;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;

/**
 * Created by benjamin on 05/16/2018
 */

public class MyDialogFragment extends DialogFragment{
    public static final String MESSAGE_KEY = "message_key";
    public static final int OPEN_CODE = 1;
    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        Bundle bundle = getArguments();
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        builder.setMessage(bundle.getString(MESSAGE_KEY))
                .setPositiveButton("YES", (dialog,id) -> {}).setNegativeButton("NO",(dialog,id) -> {});

        return builder.create();
    }
    /*public void logout(){
        Intent intent = new Intent(HomeActivity.class, MainActivity.class);
        startActivityForResult(intent, OPEN_CODE);
    }*/

}