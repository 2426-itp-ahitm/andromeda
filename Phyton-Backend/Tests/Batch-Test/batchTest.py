from subprocess import Popen
p = Popen("test.bat", cwd=r"C:\Users\gabri\Desktop\Schule\ITP\4.Klasse\Andromeda\Phyton-Backend\Batch-Test")
stdout, stderr = p.communicate()