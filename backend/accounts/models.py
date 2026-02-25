from django.db import models

# Users table - Exact match for your PostgreSQL
class Users(models.Model):
    class Meta:
        db_table = 'users'        # Your exact table name
        managed = False            # Django won't modify existing table
    
    # Exact columns from your PostgreSQL
    id = models.AutoField(primary_key=True, db_column='id')
    name = models.CharField(max_length=255, db_column='name')
    email = models.CharField(max_length=255, unique=True, db_column='email')
    password = models.TextField(db_column='password')
    google_id = models.TextField(blank=True, null=True, db_column='google_id')
    created_at = models.DateTimeField(auto_now_add=True, db_column='created_at')
    
    def __str__(self):
        return self.name

# Login history table - Django will create this
class LoginHistory(models.Model):
    class Meta:
        db_table = 'login_history'
    
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField()           # Stores users.id
    email = models.EmailField(max_length=255)
    login_time = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.email} - {self.login_time}"