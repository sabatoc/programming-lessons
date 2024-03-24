using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerAttack : MonoBehaviour
{
    private Collider attackCollider;
    public float knockBackForce = 10f; // Adjust the force as needed

    void Start()
    {
        // Initialize references
        attackCollider = GetComponent<Collider>();
        // Make sure the attack hitbox collider is disabled on start
        attackCollider.enabled = false;
    }

    void Update()
    {
        // Check for Spacebar press to enable the attack hitbox collider
        if (Input.GetKeyDown(KeyCode.Space))
        {
            Attack();
        }
    }

    void Attack()
    {
        // Enable the attack hitbox collider
        attackCollider.enabled = true;

        // Optionally, add a cooldown or delay here to automatically disable the collider
        // after a short duration, e.g., 0.5 seconds, to simulate the attack duration
        Invoke("DisableAttackCollider", 0.5f); // Example: disables the collider after 0.5 seconds
    }

    void DisableAttackCollider()
    {
        // Disable the attack hitbox collider
        attackCollider.enabled = false;
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Enemy")) // Make sure the enemy has the tag "Enemy"
        {
            // Logic to damage the enemy goes here
            Debug.Log("Hit the enemy!");
            // Here you can call any method to damage the enemy
            other.GetComponent<EnemyHealth>().TakeDamage(25); // Example damage

            Rigidbody enemyRb = other.GetComponent<Rigidbody>();
            if (enemyRb != null)
            {
                // Calculate direction from the player to the enemy
                Vector3 knockBackDirection = (other.transform.position - transform.position).normalized;

                // Optionally, add some upward force to make the knockback more noticeable
                knockBackDirection.y = 0.5f; // Adjust this value as needed

                // Apply force to the enemy Rigidbody
                enemyRb.AddForce(knockBackDirection * knockBackForce, ForceMode.Impulse);
            }
        }
    }

}
