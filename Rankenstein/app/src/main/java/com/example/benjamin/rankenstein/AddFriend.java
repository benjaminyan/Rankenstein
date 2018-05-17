package com.example.benjamin.rankenstein;


import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.Menu;
import android.view.MenuItem;

import java.util.ArrayList;
import java.util.List;


public class AddFriend extends AppCompatActivity{
    public static final int ADD_FRIEND_CODE = 1;
    private RecyclerView recyclerView;
    LargeAdapter adapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_friend);
        List<String> strings = new ArrayList<>();
        strings.add("by120 " + "(25 mutual friends)");
        strings.add("blahblahblah "+ "(24 mutual friends)");
        int count = 23;
        for(int i = 0; i < 20; i++){
            strings.add("blahblahblah" + i + " (" + count + " mutual friends)");
            count--;
        }
        recyclerView = (RecyclerView) findViewById(R.id.rankList);
        adapter = new LargeAdapter(strings,this);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));
    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            // Respond to the action bar's Up/Home button
            case R.id.settings:
                Intent intent = new Intent(this, Settings.class);
                startActivityForResult(intent, ADD_FRIEND_CODE);
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu){
        getMenuInflater().inflate(R.menu.icons, menu);
        return super.onCreateOptionsMenu(menu);
    }
    @Override
    public boolean onPrepareOptionsMenu(Menu menu) {
        super.onPrepareOptionsMenu(menu);
        menu.findItem(R.id.addFriend).setVisible(false);
        menu.findItem(R.id.friendsList).setVisible(false);
        menu.findItem(R.id.settings).setVisible(false);
        menu.findItem(R.id.sign_out).setVisible(false);
        return true;
    }


}
