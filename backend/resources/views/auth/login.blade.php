@extends('layouts.app')

@section('content')

<div class="page-wrapper full-page">
    <div class="page-content d-flex align-items-center justify-content-center">

        <div class="row w-100 mx-0 auth-page">
            <div class="col-md-8 col-xl-6 mx-auto">
                <div class="card">
                    <div class="row">
        <div class="col-md-4 pr-md-0">
          <div class="auth-left-wrapper">

          </div>
        </div>
        <div class="col-md-8 pl-md-0">
          <div class="auth-form-wrapper px-4 py-5">
            <a href="#" class="noble-ui-logo d-block mb-2">মানবতার<span>ঘর</span></a>
            <h5 class="text-muted font-weight-normal mb-4">Welcome back! Log in to your account.</h5>
            <form class="forms-sample" method="POST" action="{{ route('login') }}">
                @csrf
              <div class="form-group">
                <label for="email">{{ __('E-Mail Address') }}</label>
                <input type="email" name="email" class="form-control @error('email') is-invalid @enderror" id="email" placeholder="Email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                @error('email')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
                @enderror
              </div>
              <div class="form-group">
                <label for="password">{{ __('Password') }}</label>
                <input type="password" name="password" class="form-control @error('password') is-invalid @enderror" id="password" autocomplete="current-password" placeholder="Password">
                @error('password')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
                @enderror
            </div>
              <div class="form-check form-check-flat form-check-primary">
                <label class="form-check-label">
                  <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                  {{ __('Remember Me') }}
                </label>
              </div>
              <div class="mt-3">
                  <button type="submit" class="btn btn-primary mr-2 mb-2 mb-md-0 text-white">
                    {{ __('Login') }}
                  </button>
                @if (Route::has('password.request'))
                <a class="btn btn-outline-primary btn-icon-text mb-2 mb-md-0" href="{{ route('password.request') }}">
                    {{-- <i class="btn-icon-prepend" data-feather="twitter"></i> --}}
                    {{ __('Forgot Your Password?') }}
                </a>
                @endif
              </div>
              @if (Route::has('register'))
              <a href="{{route('register')}}" class="d-block mt-3 text-muted">Not a user? Sign up</a>
              @endif
            </form>
          </div>
        </div>
      </div>
                </div>
            </div>
        </div>

    </div>
</div>

@endsection

{{--

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Login') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror

                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label" for="remember">
                                        {{ __('Remember Me') }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Login') }}
                                </button>

                                @if (Route::has('password.request'))
                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                        {{ __('Forgot Your Password?') }}
                                    </a>
                                @endif
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div> --}}
