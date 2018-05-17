package com.example.benjamin.rankenstein;

import android.content.Intent;
import android.graphics.Color;
import android.support.v4.app.NavUtils;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Spannable;
import android.text.SpannableString;
import android.text.style.ForegroundColorSpan;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {
    EditText usernameField;
    EditText passwordField;
    Button loginButton;
    Button createNewAccountButton;
    public static final int CREATE_ACCOUNT_CODE = 1;
    public static final int HOME_CODE = 2;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        loginButton = findViewById(R.id.loginButton);
        createNewAccountButton = findViewById(R.id.createAccountButton);
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                login();
            }
        });
        createNewAccountButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                createNewAccount();
            }
        });

    }
    public void createNewAccount(){
        Intent intent = new Intent(this, CreateNewAccount.class);
        startActivityForResult(intent, CREATE_ACCOUNT_CODE);
    }

    public void login(){
        usernameField = findViewById(R.id.usernameField);
        passwordField = findViewById(R.id.passwordField);
        String username = usernameField.getText().toString();
        String password = passwordField.getText().toString();
        if(username.toLowerCase().equals("by120") && password.equals("dummypassword")){
            Intent intent = new Intent(this, HomeActivity.class);
            startActivityForResult(intent, HOME_CODE);
        }
    }
    /*@Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            // Respond to the action bar's Up/Home button
            case R.id.sign_out:
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
    @Override
    public boolean onPrepareOptionsMenu(Menu menu) {
        super.onPrepareOptionsMenu(menu);
        menu.findItem(R.id.sign_out).setVisible(false);
        return true;
    }*/

}
