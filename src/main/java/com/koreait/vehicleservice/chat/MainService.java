package com.koreait.vehicleservice.chat;

import com.koreait.vehicleservice.MyUserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainService {

    @Autowired MainMapper mapper;
    @Autowired MyUserUtils userUtils;

    public int createChatting(Room room){
        //세션값있는지 체크해야함
        //세션값과 구매자의 회원번호가 다른지 확인해야함
        //이미 두사람이 입장된 방이 있는지 판별해야함

        int result = mapper.inchattingList(room); //해당 판매번호에 대한 방번호개설
        int roomNumber = mapper.selRoomNumber(room); //방번호받기
        room.setRoomNumber(roomNumber);
        int result2 = mapper.inchattingUser(room); //해당 방번호에 입장할 구매자
        room.setIuser(userUtils.getLoginUserPk());
        int result3 = mapper.inchattingUser(room); //해당 방번호에 입장할 판매자
        if(result==1 && result2==1 && result3==1){
            return roomNumber;
        }
    return 0;
    }

    public List<ChattingRoom> selCattingRoom(Room room){
        return mapper.selCattingRoom(room);
    }

    public int inChattingRoom(ChattingRoom chroom){
        return mapper.inChattingRoom(chroom);
    }
}
