package com.example.benjamin.rankenstein;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

import static android.support.v4.app.ActivityCompat.startActivityForResult;

public final class LargeAdapter extends RecyclerView.Adapter<LargeAdapter.ViewHolder> {
    private static final int SIZE = 1000;
    private final List<String> items;
    private static int pos = 0;
    private final int OPEN_CODE =1;
    Context context;

    public LargeAdapter newInstance(Context context) {
        List<String> items = new ArrayList<>();
        String format = context.getString(R.string.item_string);
        for (int i = 0; i < SIZE; i++) {
            items.add(String.format(format, i + 1));
        }
        return new LargeAdapter(items,context);
    }

    public LargeAdapter(List<String> items, Context c) {
        this.items = items;
        this.context = c;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(android.R.layout.simple_list_item_1, parent, false);
        return ViewHolder.newInstance(view);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        String text = items.get(position);
        holder.setText(text);
        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                pos = position;
                if(context.getClass().equals(HomeActivity.class)){
                    Intent intent = new Intent(context, OpenRank.class)
                            .setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    context.startActivity(intent);
                }
            }
        });
    }

    @Override
    public int getItemCount() {
        return items.size();
    }

    public static final class ViewHolder extends RecyclerView.ViewHolder {
        private final TextView textView;

        public static ViewHolder newInstance(View itemView) {
            TextView textView = (TextView) itemView.findViewById(android.R.id.text1);
            return new ViewHolder(itemView, textView);
        }

        private ViewHolder(View itemView, TextView textView) {
            super(itemView);
            this.textView = textView;
        }

        public void setText(CharSequence text) {
            textView.setText(text);
        }
    }

    public static int getPosition(){
        return pos;
    }
}
