package br.com.lincon.sched.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SecretariaResponse {
  private Long id;
  private String address;
  private boolean isMain;
  private Long clinicId;
}
