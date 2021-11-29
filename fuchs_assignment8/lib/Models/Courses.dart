class Course {
  final String id;
  final String courseInstructor;
  final String courseCredits;
  final String courseID;
  final String courseName;
  final DateTime dateEntered;

  Course._(this.id, this.courseInstructor, this.courseCredits, this.courseID,
      this.courseName, this.dateEntered);

  factory Course.fromJson(Map json) {
    final id = json[''].replaceAll('ObjectId(\"', '').replaceAll('\")', '');
    final courseInstructor = json['courseInstructor'];
    final courseCredits = json['courseCredits'];
    final courseID = json['courseID'];
    final courseName = json['courseName'];
    final dateEntered = json['dateEntered'];

    return Course._(
        id, courseInstructor, courseCredits, courseID, courseName, dateEntered);
  }
}
