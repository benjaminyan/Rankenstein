package com.example.benjamin.rankenstein;

import java.util.ArrayList;

/**
 * Created by benjamin on 5/16/18.
 */

public class User {
    String username;
    ArrayList<ArrayList<String>> rankList;
    public User(String username, ArrayList<ArrayList<String>> rankList){
        this.username = username;
        this.rankList = rankList;
    }

}
