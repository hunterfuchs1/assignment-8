import 'package:flutter/material.dart';
import 'api.dart';

class EditClass extends StatefulWidget {
  final String id, courseInstructor, courseCredits, courseID, courseName;
  final DateTime dateEntered;

  final ClassApi api = ClassApi();

  EditClass(this.id, this.courseInstructor, this.courseCredits, this.courseID,
      this.courseName, this.dateEntered);

  @override
  _EditClassState createState() => _EditClassState(
      id, courseInstructor, courseCredits, courseID, courseName, dateEntered);
}

class _EditClassState extends State<EditClass> {
  final String id, courseInstructor, courseCredits, courseID, courseName;
  final DateTime dateEntered;

  _EditClassState(this.id, this.courseInstructor, this.courseCredits,
      this.courseID, this.courseName, this.dateEntered);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Change"),
      ),
    );
  }
}
