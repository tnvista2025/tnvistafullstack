from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
from .models import Users, LoginHistory
import jwt
import datetime
import json

JWT_SECRET = 'Tnvista2025'
JWT_EXPIRATION = 7

def home(request):
    return HttpResponse("""
        <html>
            <head>
                <title>TNVista API</title>
                <style>
                    body { font-family: Arial; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; }
                    h1 { font-size: 3em; margin-bottom: 20px; }
                    .api-list { background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; max-width: 600px; margin: 0 auto; }
                    .endpoint { background: rgba(0,0,0,0.3); padding: 10px; margin: 10px 0; border-radius: 5px; font-family: monospace; }
                </style>
            </head>
            <body>
                <h1>🚀 TNVista API Server</h1>
                <div class="api-list">
                    <h2>Available Endpoints:</h2>
                    <div class="endpoint">POST /accounts/api/signup/ - Create new account</div>
                    <div class="endpoint">POST /accounts/api/login/ - Login user</div>
                    <div class="endpoint">GET /admin/ - Admin panel</div>
                </div>
                <p>React Frontend: http://localhost:5173</p>
            </body>
        </html>
    """)

def test_api(request):
    return JsonResponse({
        'status': 'ok',
        'message': 'TNVista API is working',
        'endpoints': {
            'signup': '/accounts/api/signup/',
            'login': '/accounts/api/login/',
            'admin': '/admin/'
        }
    })

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

# ============================================
# SIGNUP API - FIXED for your PostgreSQL
# ============================================
@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("="*50)
            print("📝 SIGNUP REQUEST:", data)
            print("="*50)
            
            # Validate required fields
            if not data.get('name'):
                return JsonResponse({'name': 'Name is required'}, status=400)
            if not data.get('email'):
                return JsonResponse({'email': 'Email is required'}, status=400)
            if not data.get('password'):
                return JsonResponse({'password': 'Password is required'}, status=400)
            if not data.get('confirmPassword'):
                return JsonResponse({'confirmPassword': 'Confirm password is required'}, status=400)
            
            # Check if passwords match
            if data['password'] != data['confirmPassword']:
                return JsonResponse({'confirmPassword': 'Passwords do not match'}, status=400)
            
            # Check password length
            if len(data['password']) < 6:
                return JsonResponse({'password': 'Password must be at least 6 characters'}, status=400)
            
            # Check if email already exists
            if Users.objects.filter(email=data['email']).exists():
                return JsonResponse({'email': 'Email already registered'}, status=400)
            
            # Create user - Using your exact PostgreSQL columns
            user = Users.objects.create(
                name=data['name'],
                email=data['email'],
                password=make_password(data['password'])
                # id auto-generates, google_id optional
            )
            print(f"✅ USER CREATED: ID={user.id}, Email={user.email}, Name={user.name}")
            
            # Generate JWT token
            token = jwt.encode({
                'user_id': user.id,           # IMPORTANT: user.id not user.user_id
                'email': user.email,
                'name': user.name,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=JWT_EXPIRATION)
            }, JWT_SECRET, algorithm='HS256')
            
            return JsonResponse({
                'success': True,
                'message': 'Account created successfully',
                'token': token,
                'user': {
                    'user_id': user.id,       # Send id as user_id
                    'name': user.name,
                    'email': user.email
                }
            }, status=201)
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            print("❌ ERROR:", str(e))
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

# ============================================
# LOGIN API - FIXED for your PostgreSQL
# ============================================
@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Validate required fields
            if not data.get('email'):
                return JsonResponse({'email': 'Email is required'}, status=400)
            if not data.get('password'):
                return JsonResponse({'password': 'Password is required'}, status=400)
            
            # Find user by email
            try:
                user = Users.objects.get(email=data['email'])
                print(f"🔍 USER FOUND: ID={user.id}, Email={user.email}")
                
                # Check password
                if check_password(data['password'], user.password):
                    # Generate JWT token
                    token = jwt.encode({
                        'user_id': user.id,    # IMPORTANT: user.id not user.user_id
                        'email': user.email,
                        'name': user.name,
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=JWT_EXPIRATION)
                    }, JWT_SECRET, algorithm='HS256')
                    
                    # Record login history
                    LoginHistory.objects.create(
                        user_id=user.id,       # Store user.id
                        email=user.email,
                        ip_address=get_client_ip(request),
                        user_agent=request.META.get('HTTP_USER_AGENT', '')
                    )
                    
                    return JsonResponse({
                        'success': True,
                        'message': 'Login successful',
                        'token': token,
                        'user': {
                            'user_id': user.id,    # Send id as user_id
                            'name': user.name,
                            'email': user.email
                        }
                    })
                else:
                    return JsonResponse({
                        'error': 'Invalid email or password'
                    }, status=401)
                    
            except Users.DoesNotExist:
                return JsonResponse({
                    'error': 'Invalid email or password'
                }, status=401)
                
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            print("❌ ERROR:", str(e))
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

# ============================================
# CHECK EMAIL API
# ============================================
@csrf_exempt
def check_email(request):
    if request.method == 'GET':
        email = request.GET.get('email')
        if email:
            exists = Users.objects.filter(email=email).exists()
            return JsonResponse({'exists': exists})
        return JsonResponse({'error': 'Email parameter required'}, status=400)
    return JsonResponse({'error': 'Method not allowed'}, status=405)