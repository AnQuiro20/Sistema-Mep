/** Authenticated teacher resolved on the server; every application service receives one. */
export interface TeacherContext {
  readonly teacherId: string;
}
