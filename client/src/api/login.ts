import { User } from "../types/user";
import { BASE_URL } from "./const";
import axios from "axios";

type LoginResult = "success" | "fail";

export interface LoginRequest {
  username: string;
  password: string;
}

export const login = async (args: LoginRequest): Promise<LoginResult> => {
  // TODO 3-1: POST, '/auth/login' 호출
  // body에는 { username, password }가 들어가야 함
  // 사용하는 기술에 맞추어 적절히 withCredential 설정하기

  const result = await axios
    .post(`${BASE_URL}/auth/login`, args, {
      headers: {
        "Content-Type": "application/json",
        credentials: "include"
      }
    })
    .then((Response) => {
      return Response.data.result;
    })
    .catch((Error) => {
      console.log(Error);
    });

  console.log(result);

  if (result) {
    return "success";
  } else {
    return "fail";
  }
};

export const getCurrentUserInfo = async (): Promise<User | null> => {
  // TODO 3-2: GET, '/profile' 호출
  // 호출 성공시 유저 정보 반환
  // 마찬가지로 사용하는 기술에 맞추어 적절히 withCredential 설정하기
  const userInfoRes = await axios
    .get(`${BASE_URL}/profile`, {
      headers: {
        "Content-Type": "application/json",
        credentials: "include"
      }
    })
    .then((Response) => {
      console.log(Response);
      return Response;
    })
    .catch((Error) => {
      console.log(Error);
    });

  if(userInfoRes) {
    return userInfoRes.data
  } else {
    return null
  };

};
