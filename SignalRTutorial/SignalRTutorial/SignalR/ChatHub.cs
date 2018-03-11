using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRTutorial
{
    public class ChatHub : Hub
    {
        public void Send(string name, string message)
        {
            // Call the broadcastMessage method to update clients.
            Clients.All.broadcastMessage(name, message);
        }

        public void SayAlot(string name)
        {
            for (int i = 0; i < 11; i++)
            {
                Clients.All.broadcastMessage(name, string.Format("I am saying: {0}", i));
            }
        }
    }
}