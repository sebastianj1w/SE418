package com.wordLadder.wordLadder.controller;
import com.wordLadder.wordLadder.wordladder.WordLadder;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.*;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;



import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
@RestController
@RequestMapping(value="/api")
public class WorldLadderController {

    @RequestMapping(value = "/BFS", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public JSONObject getWordLadder(@RequestBody JSONObject words) throws IOException
    {
        ClassPathResource dict = new ClassPathResource("static/small.json");
        WordLadder wl = new WordLadder(dict.getInputStream());
        ArrayList<String> list = wl.BFS(words.get("input").toString(), words.get("output").toString());
        JSONArray result = JSONArray.fromObject(list);
        JSONObject response = new JSONObject();
        response.put("result", result);
        response.put("status", 200);
        return response;
    }

    @RequestMapping(value = "/search", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public JSONObject search(@RequestParam("word") String word) throws IOException
    {
        ClassPathResource dict = new ClassPathResource("static/small.json");
        WordLadder wl = new WordLadder(dict.getInputStream());
        JSONObject result = new JSONObject();
        result.put("has", wl.find(word));
        result.put("status" , 200);
        return result;
    }
}
