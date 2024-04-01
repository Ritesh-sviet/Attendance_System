<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Check if user is authenticated
        if (Auth::user()) {
            // Retrieve all attendance records for the authenticated user (intern)
            $attendanceRecords = Attendance::with("intern:id,name,email")->where("intern_id", Auth::user()->id)->get();
            
            // Check if any attendance records were found
            if ($attendanceRecords->count() > 0) {
                // Return success response with attendance records
                return response()->json([
                    "success" => true,
                    "message" => "Attendance records loaded successfully",
                    "attendanceRecords" => $attendanceRecords
                ]);
            } else {
                // Return failure response if no attendance records were found
                return response()->json([
                    'success' => false,
                    'message' => 'No attendance records found for this user',
                    'attendanceRecords' => []
                ]);
            }
        } else {
            // Return failure response if user is not authenticated
            return response()->json([
                'success' => false,
                'message' => 'You are not authenticated!',
                'attendanceRecords' => []
            ]);
        }
    }

    // public function adminIndex()
    // {
    //     // authentication
    //     if (Auth::user()) {
    //         // authorization
    //         $intern = Attendance::where('intern_id', Auth::user()->id);
    //         if (!empty($intern)) {
    //             $attendanceRecord = Attendance::with("intern:id,name,email")->get();
    //             return response()->json(["success" => true, "message" => "attendance record loaded successfully", 'attendanceRecord' => $attendanceRecord]);
    //         } else {
    //             return response()->json(['success' => false, 'message' => 'something went wrong!']);
    //         }
    //     } else {
    //         return response()->json(['success' => false, 'message' => 'something went wrong!']);
    //     }
    // }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Auth::user()->id) {
            $request->validate([
                'date' => 'required',
            ]);
            // dd($request->all());
            $intern_id = Auth::user()->id;
            // $intern = Attendance::where('intern_id', $intern_id , "&&" , "date", $request->date)->first();
            // dd($intern);
            $intern = Attendance::where('intern_id', $intern_id)->where("date", $request->date)->first();
            if (!empty($intern)) {
                if ($intern->out_time && $intern->in_time) {
                    return response()->json(["success" => false, "message" => "your attendance is already marked"]);
                } else if (!empty($request['out_time'])) {
                    $intern->out_time = $request['out_time'];

                    if ($intern->save()) {
                        return response()->json(["success" => true, "message" => "attendance updated successfully"]);
                    } else {
                        return response()->json(["success" => false, "message" => "something went wrong"]);
                    }
                } else {
                    return response()->json(["success" => false, "message" => "Please enter out time"]);
                }
            } else {
                $attendance = Attendance::create([
                    'intern_id' => Auth::user()->id,
                    'date' => $request->date,
                    'in_time' => $request->in_time
                ]);

                if ($attendance) {
                    return response()->json(["success" => true, "message" => "attendance marked successfully"]);
                } else {
                    return response()->json(["success" => false, "message" => "something went wrong!"]);
                }
            }

        } else {
            return response()->json(["success" => false, "message" => "you are not authorized to mark the attendance!"]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attendance $attendance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        //
    }
}
