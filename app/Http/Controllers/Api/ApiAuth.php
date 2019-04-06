<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use JWTAuth ;
use Tymon\JWTAuth\Exceptions\JWTException;
use Validator;
use App\Http\Controllers\Controller;
use App\User;
use Auth;
class ApiAuth extends Controller
{
    public function login(Request $request){
        $validator = Validator::make($request->all() , [
            'email' => 'required',
            'password' => 'required',
        ]);

        if($validator->fails()){
            return response(['status' => false , 'errors' => $validator->errors()] , 400);
        }

        $credentials = $request->only(['email' ,'password']);

        try{
           if( !$token = JWTAuth::attempt($credentials)){
                return response(['status' => false, 'errors' => 'Invaild Email or Password'], 400);
           }
        }catch (JWTException  $e) {
            return response(['status' => false, 'errors' => 'Token inVaild'], 400);
        }
        return response(['token' => $token , 'user' => Auth::user() ] ) ;

    }

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        if($validator->fails()){
             return response(['status' => false, 'errors' => $validator->errors()], 400);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email ;
        $user->password = bcrypt( $request->password) ;

        if($user->save()){
            return response(['status' => true, 'success' => 'Users register']);
        }
        return response(['status' => false, 'errors' => 'cant add user'], 403);

    }

}
