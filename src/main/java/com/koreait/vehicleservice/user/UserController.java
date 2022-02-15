package com.koreait.vehicleservice.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired UserService service;

    @GetMapping("/login")
    public void getLogin(@ModelAttribute UserEntity userEntity) {}

    @PostMapping("/login")
    public String postLogin(UserEntity userEntity, RedirectAttributes rAttr) {
        int rs = service.login(userEntity);
        System.out.println(rs); //1: 로그인성공 2: 아이디없음 3: 비밀번호틀림
        switch (rs) {
            case 1:
                return "redirect:/home";
            case 2:
                rAttr.addFlashAttribute("idMsg", "아이디를 잘못 입력하였습니다.");
                rAttr.addFlashAttribute("id", userEntity.getUid());
                return "redirect:/user/login";
            //addAttribute는 쿼리스트링 이용 ?뒤에 파라미터보임, addFlashAttribute는 세션이용 ?뒤에 파라미터가 안보인다
            case 3:
                rAttr.addFlashAttribute("pwMsg", "비밀번호를 잘못 입력하였습니다.");
                rAttr.addFlashAttribute("id", userEntity.getUid());
                return "redirect:/user/login";
        }
        return null;
    }

    @GetMapping("/logout")
    public String logout(HttpSession hs){
        hs.invalidate();
        return "redirect:/home";
    }

    @GetMapping("/find")
    public void find() {}

    @GetMapping("/join") //th:filed에서 에러가났는데 @modelattribue추가해서 해결(값을 담을수있는 통을보내준다고 생각)
    public void getJoin(@ModelAttribute UserEntity userEntity) {}

    @PostMapping("/join")
    public String postJoin(UserEntity userEntity){
        int rs = service.joinProc(userEntity);
        System.out.println(rs);
        return "redirect:/user/login";
    }

    @GetMapping("/idChk/{uid}")
    @ResponseBody
    public Map<String, Integer> idChk(@PathVariable String uid){ //uid에 아이디값이 담긴다
        Map<String, Integer> res = new HashMap<>(); //암호화
        res.put("result", service.idChk(uid));
        return res; //json형태로 변환해서 날림
    }
}
