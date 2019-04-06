<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Crud App</title>

    <link rel="stylesheet" href="{{asset('css/app.css')}}">
<meta name="csrf-token" content="{{ csrf_token() }}">

</head>
<body>
<section id="app">
    <div class="container">
        <transition name="fade" >
            <router-view></router-view>
        </transition>
    </div>
</section>



<script>
    window.laravel = <?php echo json_encode([
        'csrfToken' => csrf_token()
    ]); ?>
</script>

<script src="{{asset('js/app.js')}}"></script>
</body>
</html>
