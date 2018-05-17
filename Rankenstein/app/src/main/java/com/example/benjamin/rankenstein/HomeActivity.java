package com.example.benjamin.rankenstein;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.Menu;
import android.view.MenuItem;
import android.app.Dialog;
import android.app.DialogFragment;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.view.View;
import android.widget.AdapterView;

import java.util.ArrayList;
import java.util.List;


public class HomeActivity extends AppCompatActivity {
    FloatingActionButton fb;
    private RecyclerView recyclerView;
    LargeAdapter adapter;
    public static final int OPEN_CODE = 1;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        fb = findViewById(R.id.createRankButton);
        List<String> strings = new ArrayList<>();
        strings.add("Presidents");
        strings.add("Football Teams");
        for(int i = 0; i < 20; i++){
            strings.add("Football Teams");
        }
        recyclerView = (RecyclerView) findViewById(R.id.rankList);
        adapter = new LargeAdapter(strings,this);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));
        recyclerView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                viewRank();
            }
        });
        fb.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                createRank();
            }
        });
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            // Respond to the action bar's Up/Home button
            case R.id.addFriend:
                Intent intent = new Intent(this, AddFriend.class);
                startActivityForResult(intent, OPEN_CODE);
                return true;
            case R.id.friendsList:
                Intent intent2 = new Intent(this, FriendList.class);
                startActivityForResult(intent2, OPEN_CODE);
                return true;
            case R.id.sign_out:
                createAndShowAlertDialog();
                return true;
            case R.id.settings:
                Intent intent3 = new Intent(this, Settings.class);
                startActivityForResult(intent3, OPEN_CODE);
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
    public void viewRank(){
        Intent intent = new Intent(this, OpenRank.class);
        startActivityForResult(intent, OPEN_CODE);
        return;
    }
    public void logout(){
        Intent intent = new Intent(this, MainActivity.class);
        startActivityForResult(intent, OPEN_CODE);
    }
    private void createAndShowAlertDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Are you sure you want to logout?");
        builder.setPositiveButton("YES", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                logout();
                dialog.dismiss();
            }
        });
        builder.setNegativeButton("NO", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                //do nothing
                dialog.dismiss();
            }
        });
        AlertDialog dialog = builder.create();
        dialog.show();
    }
    public void createRank(){
        Intent intent = new Intent(this, CreateRank.class);
        startActivityForResult(intent, OPEN_CODE);
    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu){
        getMenuInflater().inflate(R.menu.icons, menu);
        return super.onCreateOptionsMenu(menu);
    }
    @Override
    public boolean onPrepareOptionsMenu(Menu menu) {
        super.onPrepareOptionsMenu(menu);
        menu.findItem(R.id.search).setVisible(false);
        return true;
    }

}