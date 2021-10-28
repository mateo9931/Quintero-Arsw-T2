package com.example.connetor.impl;


import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.example.connector.ConectorApi;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Component
@Qualifier("conn")
public class ConectorApiImpl implements ConectorApi {
    private final String apiKey ="";

    @Override
    public String getData() {
        StringBuilder data = new StringBuilder();
        URL url = null;
        HttpURLConnection con = null;
        try{
            url = new URL(""+apiKey);
            con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            BufferedReader rd = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String linea;
            while ((linea = rd.readLine()) != null) {
                data.append(linea);
            }
            rd.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        return data.toString();
    }
}
