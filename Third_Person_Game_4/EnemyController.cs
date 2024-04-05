using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyController : MonoBehaviour
{
    public Transform player;

    void Update()
    {
        // Rotate the enemy to face the player
        transform.LookAt(player);
    }
}
