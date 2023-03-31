package com.example.doenggameflux.config.urlEnum;

public enum WebSocketMapping {
    FACE("/face"),
    OBJECT("/object"),
    DODDLE("/doodle");

    private final String url;

    WebSocketMapping(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }
}