from django.db import models

# Create your models here.
class Product(models.Model):
    prdName             = models.CharField(max_length=40)
    price               = models.IntegerField()
    content             = models.TextField()
    # StorageCode         = models.ForeignKey('Storage', on_delete=models.SET_NULL, null=True)
    discount            = models.FloatField()
    # SupplyerCode        = models.ForeignKey('Supplyer', on_delete=models.SET_NULL, null=True)
    registered_date     = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.prdName

class Storage(models.Model):
    StorageCode         = models.IntegerField(primary_key=True)
    StorageLoc          = models.CharField(max_length=20)
    StorageStock        = models.IntegerField()
    StorageUse          = models.BooleanField(default=False)
    StroageTel          = models.CharField(max_length=20)

class Supplyer(models.Model):
    SupplyerCode        = models.IntegerField(primary_key=True)
    SupplyerName        = models.CharField(max_length=20)
    SupplyerAddr        = models.CharField(max_length=50)
    SupplyerTel         = models.CharField(max_length=20)
    SupplyerEmail       = models.EmailField(max_length=20, unique=True)
    SupplyerBankName    = models.CharField(max_length=20)
    SupplyerAccount     = models.CharField(max_length=20)
    AccountHolder       = models.CharField(max_length=20)