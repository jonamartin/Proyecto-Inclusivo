using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using proyecto_inclusivo.models;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace proyecto_inclusivo.Controllers
{
    [ApiController]
    [EnableCors]
    public class UserController : ControllerBase
    {
        private string jsonMenu = "";

        private UserContext _db;

        public UserController(UserContext db)
        {
            _db = db;
        }

        [HttpGet]
        [Authorize]
        [Route("get")]
        public User GetUser()
        {
            return (_db.Users.FirstOrDefault());
        }

        [HttpPost]
        [Route("registro")]
        public IActionResult New([FromBody] User user)
        {
            var _user = _db.Users.FirstOrDefault(u => u.Email == user.Email);

            if (_user != null)
            {
                return BadRequest();
            }
            else
            {
                user.Password = HashPassHelper.Hash(user.Password);
                user.Answ = HashPassHelper.Hash(user.Answ);
                _db.Users.Add(user);

                _db.SaveChanges();
                return Ok();
            }
        }
        
        [HttpGet]
        [Route("guardado")]
        public string enviarMenu()
        {
            return JsonConvert.SerializeObject(jsonMenu);
        }
        [HttpPost]
        [Route("guardado")]
        public IActionResult enviarMenu([FromBody] string menu)
        {
            jsonMenu = menu;
            return Ok();
        }

        [HttpPost]
        [Route("forgotpassword")]
        public IActionResult PasswordResetValidation([FromBody] User user)
        {
            var _user = _db.Users.FirstOrDefault(u => u.Email == user.Email);

            if (_user != null && HashPassHelper.Check(_user.Answ, user.Answ) && _user.Sec_quest == user.Sec_quest)
            {
                _user.Password = HashPassHelper.Hash(user.Password);

                _db.SaveChanges();

                return Ok();
            }

            else { return Unauthorized(); }
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] User user)
        {
            var _user = _db.Users.FirstOrDefault(u => u.Email == user.Email);

            if (_user != null && HashPassHelper.Check(_user.Password, user.Password))
            {
                //Generar JWT
                var tokenString = GenerateJWT.Gen(_user);

                //Almacenar y enviar en una cookie
                HttpContext.Response.Headers.Add(
                    "Authorization",
                    "Bearer " + tokenString
                );

                HttpContext.Response.Cookies.Append(

                    "SSID", // No tocar hasta solucionar verificacion
                    Guid.NewGuid().ToString(),
                    new CookieOptions
                    {
                        Expires = DateTime.Now.AddDays(1),
                        HttpOnly = false, // No tocar hasta solucionar verificacion
                        Secure = false
                    });

                return Ok();
            }

            else { return Unauthorized(); }
        }
    }
}