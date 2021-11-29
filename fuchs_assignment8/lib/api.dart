import 'package:dio/dio.dart';

import './Models/Courses.dart';

const String localhost = "http://10.0.2.2:1200/";

class ClassApi {
  final _dio = Dio(BaseOptions(baseUrl: localhost));

  Future<List> getAllCourses() async {
    final response = await _dio.get('/getAllCourses');

    return response.data['courses'];
  }
}
