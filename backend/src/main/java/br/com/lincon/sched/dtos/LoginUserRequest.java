package br.com.lincon.sched.dtos;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginUserRequest {
  @NotBlank
  private String email;
  @NotBlank
  private String password;
}
