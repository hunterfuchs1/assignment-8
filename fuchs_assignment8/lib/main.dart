import 'package:flutter/material.dart';
import 'api.dart';
import 'editClass.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Classes for 2021',
      theme: ThemeData(
        primarySwatch: Colors.red,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  final ClassApi api = ClassApi();

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  List courses = [];
  bool _dbLoaded = false;

  void initState() {
    super.initState();
    widget.api.getAllCourses().then((data) {
      setState(() {
        courses = data;
        _dbLoaded = true;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Classes for 2021"),
      ),
      body: Center(
          child: _dbLoaded
              ? Column(
                  children: [
                    Expanded(
                      child: ListView(
                        shrinkWrap: true,
                        padding: EdgeInsets.all(15.0),
                        children: [
                          ...courses.map<Widget>((course) => Padding(
                                padding:
                                    const EdgeInsets.symmetric(vertical: 30),
                                child: TextButton(
                                  onPressed: () => {
                                    Navigator.pop(context),
                                    Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) => EditClass(
                                                course['_id'],
                                                course['courseInstructor'],
                                                course['courseCredits'],
                                                course['courseID'],
                                                course['courseName'],
                                                course['dateEntered']))),
                                  },
                                  child: ListTile(
                                      leading: CircleAvatar(
                                        radius: 30,
                                        child: Text(course['courseCredits']),
                                      ),
                                      title: Text(
                                        (course['courseName']),
                                        style: TextStyle(fontSize: 20),
                                      )),
                                ),
                              ))
                        ],
                      ),
                    ),
                  ],
                )
              : Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Text(
                      "Database Loading",
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
                    ),
                    CircularProgressIndicator()
                  ],
                )),
    );
  }
}
