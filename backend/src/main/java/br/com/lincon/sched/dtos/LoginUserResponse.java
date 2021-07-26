package br.com.lincon.sched.dtos;

import br.com.lincon.sched.entities.UserType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginUserResponse {
  private Long id;
  private String name;
  private String email;
  private UserType type;
}
